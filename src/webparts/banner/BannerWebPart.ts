import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BannerWebPartStrings';
import Banner from './components/Banner';
import { IBannerProps } from './components/IBannerProps';
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";

export interface IBannerWebPartProps {
  description: string;
  filePickerResult: IFilePickerResult;
}

export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBannerProps> = React.createElement(
      Banner,
      {
        description: this.properties.description,
        filePickerResult: this.properties.filePickerResult
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldFilePicker('filePicker', {
                    context: this.context,
                    filePickerResult: this.properties.filePickerResult,
                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                    properties: this.properties,
                    onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e;  },
                    onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                    key: "filePickerId",
                    buttonLabel: "File Picker",
                    label: "File Picker",                  
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
