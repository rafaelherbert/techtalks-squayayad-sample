import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MenuWebPartStrings';
import Menu from './components/Menu';
import { IMenuProps } from './components/IMenuProps';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

export interface IMenuWebPartProps {
    collectionData: {
        Title: string,
        Url: string,
        Icon: string
    }[];
}

export default class MenuWebPart extends BaseClientSideWebPart<IMenuWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMenuProps> = React.createElement(
      Menu,
      {
        collectionData: this.properties.collectionData
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
                PropertyFieldCollectionData("collectionData", {
                    key: "collectionData",
                    label: "Collection data",
                    panelHeader: "Collection data panel header",
                    manageBtnLabel: "Manage collection data",
                    value: this.properties.collectionData,
                    fields: [
                      {
                        id: "Title",
                        title: "Nome",
                        type: CustomCollectionFieldType.string,
                        required: true
                      },
                      {
                        id: "Url",
                        title: "Url",
                        type: CustomCollectionFieldType.url,
                        required: true
                      },
                      {
                        id: "Icon",
                        title: "Icon",
                        type: CustomCollectionFieldType.fabricIcon,
                        required: true
                      }
                    ],
                    disabled: false
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
