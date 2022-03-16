import { override } from "@microsoft/decorators";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import Settings from "./components/settings/Settings";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { sp } from "@pnp/sp";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAdminApplicationCustomizerProperties {}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AdminApplicationCustomizer extends BaseApplicationCustomizer<IAdminApplicationCustomizerProperties> {
  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl,
      },
      spfxContext: this.context,
    });

    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );
    this._renderPlaceHolders();
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // if (!this._topPlaceholder) {
    //   this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
    //     PlaceholderName.Top,
    //     {}
    //   );

    //     const elem = React.createElement(Settings, { context: this.context });
    //     ReactDOM.render(elem, this._topPlaceholder.domElement);
    // }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          {}
        );

      const elem = React.createElement(Settings, { context: this.context });
      ReactDOM.render(elem, this._bottomPlaceholder.domElement);
    }
  }
}
