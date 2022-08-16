import * as webpackModules from '@goosemod/webpack';
import { contextMenu } from '@goosemod/patcher';
import { createItem, removeItem } from '@goosemod/settings';
import { version } from './goosemodModule.json';

let settings = {
  'mentionAuthor': false,
}

let unpatch;

export default {
  goosemodHandlers: {

    onImport: () => {
      const { ComponentDispatch } =
        webpackModules.findByProps('ComponentDispatch');
      const { ComponentActions } = webpackModules.findByProps('ComponentActions');

      unpatch = contextMenu.patch('message', {
        label: 'Quote Message',
        action: (_, props) => {
          const lines = props.message.content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            lines[i] = '> ' + lines[i];
          }

          const author = `<@${props.message.author.id}> `;

          const out = lines.join('\n') + '\n';

          ComponentDispatch.dispatchToLastSubscribed(
            ComponentActions.INSERT_TEXT,
            {
              plainText: out + (settings.mentionAuthor ? author : ''),
            }
          );
        },
      });

      createItem('Old Quote', [
        version,

        {
          type: 'header',
          text: 'Toggle the following features as per your liking',
        },
        {
          type: 'toggle',
          text: 'Mention the author',
          subtext:
            "Adds mention of the author of the message you're quoting to",
          onToggle: (c) => {
            return (settings.mentionAuthor = c);
          },
          isToggled: () => settings.mentionAuthor,
        },
      ]);
    },

    getSettings: () => [settings],
    loadSettings: ([_settings]) => {settings = _settings},

    onRemove: () => {
      unpatch();
      removeItem('Old Quote');
    },
  },
};
