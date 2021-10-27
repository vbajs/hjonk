import Plugin from "@goosemod/plugin";

const {React} = goosemod.webpackModules.common;

const ContextMenu_CloseDM = goosemod.webpackModules.find(
  (x) => x.default && x.default.displayName == "useCloseDMItem"
);
const Menu = goosemod.webpackModules.findByProps("MenuItem");

const ConnectedPrivateChannelsList = goosemod.webpackModules.find(
  (x) => x.default && x.default.displayName === "ConnectedPrivateChannelsList"
);

const ListSectionItem =
  goosemod.webpackModules.findByDisplayName("ListSectionItem");
const PrivateChannel = goosemod.webpackModules.find(
  (x) => x.default && x.default.displayName == "PrivateChannel"
);
const Clickable = goosemod.webpackModules.findByDisplayName("Clickable");
const DropdownArrow =
  goosemod.webpackModules.findByDisplayName("DropdownArrow");

const PrivateChannelHeaderClasses = goosemod.webpackModules.findByProps(
  "privateChannelsHeaderContainer"
);
const CategoryClasses = goosemod.webpackModules.findByProps(
  "containerDefault",
  "clickable"
);

const PrivateChannelStore = goosemod.webpackModules.findByProps(
  "getPrivateChannelIds"
);
const ChannelStore = goosemod.webpackModules.findByProps(
  "getChannel",
  "getDMUserIds"
);

let oldContextMenu_CloseDM;
const toUnpatch = [];

let dmDataCached;

function getPinnedDMData() {
  if (dmDataCached) return dmDataCached;

  dmDataCached = JSON.parse(goosemod.storage.get("pinnedDMs")) || [];

  return dmDataCached;
}

function setPinnedDMData(data) {
  goosemod.storage.set("pinnedDMs", JSON.stringify(data));
  dmDataCached = data;
}

function isDMPinned(id) {
  const data = getPinnedDMData();
  return data.includes(id);
}

function pinDM(id) {
  const data = getPinnedDMData();
  data.push(id);
  setPinnedDMData(data);
}

function unpinDM(id) {
  const data = getPinnedDMData();
  data.splice(data.indexOf(id), 1);
  setPinnedDMData(data);
}

function refreshPrivateChannels() {
  // Force update sidebar (jank DOM way)
  const privateChannelScroller = document.querySelector(
    `[class^="privateChannels-"] > [class^="scroller-"]`
  );
  if (privateChannelScroller) {
    privateChannelScroller.dispatchEvent(new Event("focusin"));
    privateChannelScroller.dispatchEvent(new Event("focusout"));
  }
}

let selectedChannelId;
function createPinnedSection() {
  const pinned = getPinnedDMData();

  if (pinned.length == 0) return null;

  const channels = PrivateChannelStore.getPrivateChannelIds()
    .filter((id) => pinned.includes(id))
    .map((id) => ChannelStore.getChannel(id));

  let collapsed =
    goosemod.storage.get("pinnedDMs_collapsed") == "true" ? true : false;

  let classes;

  return React.createElement(
    "div",
    {
      className: "pinned-dms-container",
    },
    React.createElement(
      Clickable,
      {
        className:
          ((classes = {
            [CategoryClasses.wrapper]: true,
            [CategoryClasses.collapsed]: collapsed,
            [CategoryClasses.clickable]: true,
            [PrivateChannelHeaderClasses.privateChannelsHeaderContainer]: true,
          }),
          Object.keys(classes)
            .filter((key) => classes[key])
            .join(" ")),
        onClick: () => {
          collapsed = !collapsed;
          goosemod.storage.set("pinnedDMs_collapsed", collapsed);

          refreshPrivateChannels();
        },
        "aria-expanded": !collapsed,
      },
      React.createElement(
        ListSectionItem,
        {},
        React.createElement(
          "span",
          {
            className: PrivateChannelHeaderClasses.headerText,
          },
          "Pinned"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            transform: collapsed && "rotate(90deg)",
            transition: "transform .2s ease-out,-webkit-transform .2s ease-out",
          },
        },
        React.createElement(DropdownArrow)
      )
    ),
    !collapsed &&
      channels.map((channel) =>
        React.createElement(
          channel.isMultiUserDM()
            ? PrivateChannel.GroupDM
            : PrivateChannel.DirectMessage,
          {
            key: channel.id,
            channel,
            selected: channel.id == selectedChannelId,
          }
        )
      )
  );
}

class PinnedDMs extends Plugin {
  onImport() {
    oldContextMenu_CloseDM = ContextMenu_CloseDM.default;
    ContextMenu_CloseDM.default = function (channelId, isOpen) {
      const ret = oldContextMenu_CloseDM(channelId, isOpen);
      return [
        ret,
        React.createElement(Menu.MenuItem, {
          id: "pin-dm",
          label: isDMPinned(channelId) ? "Unpin DM" : "Pin DM",
          action: () => {
            isDMPinned(channelId) ? unpinDM(channelId) : pinDM(channelId);
            refreshPrivateChannels();
          },
        }),
      ];
    };
    ContextMenu_CloseDM.default.displayName = "useCloseDMItem";

    toUnpatch.push(
      goosemod.patcher.patch(
        ConnectedPrivateChannelsList,
        "default",
        (_args, res) => {
          selectedChannelId = res.props.selectedChannelId;

          const PrivateChannelsList = res.type;

          toUnpatch.push(
            goosemod.patcher.patch(
              PrivateChannelsList.prototype,
              "render",
              (_, FocusJumpSection) => {
                toUnpatch.push(
                  goosemod.patcher.patch(
                    FocusJumpSection.props,
                    "children",
                    (_, PrivateChannels) => {
                      toUnpatch.push(
                        goosemod.patcher.patch(
                          PrivateChannels.props,
                          "renderRow",
                          (_, row) => {
                            if (
                              row &&
                              row.props &&
                              row.props.channel &&
                              isDMPinned(row.props.channel.id)
                            )
                              return [null]; // afterPatches checks for a truthy value, annoying

                            return row;
                          }
                        )
                      );
                      toUnpatch.push(
                        goosemod.patcher.patch(
                          PrivateChannels.props,
                          "renderSection",
                          (_, section) => {
                            if (section != null && !Array.isArray(section)) {
                              return [createPinnedSection(), section];
                            }

                            return section;
                          }
                        )
                      );
                    }
                  )
                );
              }
            )
          );
        }
      )
    );

    refreshPrivateChannels();
  }

  onRemove() {
    if (oldContextMenu_CloseDM)
      ContextMenu_CloseDM.default = oldContextMenu_CloseDM;

    for (const unpatch of toUnpatch) {
      unpatch();
    }
    toUnpatch.splice(0, toUnpatch.length);

    refreshPrivateChannels();
  }
}

export default new PinnedDMs();
