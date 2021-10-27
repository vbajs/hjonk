import Plugin from "@goosemod/plugin";

const WelcomeCTAContainer = goosemod.webpackModules.findByProps(
  "WelcomeCTAContainer"
);

let unpatch;

class NoJoinWave extends Plugin {
  onImport() {
    unpatch = goosemod.patcher.patch(
      WelcomeCTAContainer,
      "WelcomeCTAContainer",
      function () {
        return [null];
      }
    );
  }
  onRemove() {
    unpatch();
  }
}

export default new NoJoinWave();
