import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { Icon, Panel, PanelType } from 'office-ui-fabric-react';
import * as React from 'react';
import { useState } from 'react';
import { BannerImageBusiness } from '../../../../business/BannerImageBusiness';
import ListManager from '../../../../components/BannerImageAdmin/ListManager';
import { IAdminApplicationCustomizerProperties } from '../../AdminApplicationCustomizer';
import styles from './Settings.module.scss';
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import { SPPermission } from '@microsoft/sp-page-context';

interface ISettingsProps {
    context: ApplicationCustomizerContext;
}

export default function Settings(props:ISettingsProps) {
    const bll = new BannerImageBusiness(props.context);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const dismissPanel = () => { setIsPanelOpen(false); };
    const openPanel = () => { setIsPanelOpen(true); };

    return (
        <SecurityTrimmedControl 
            context={props.context}
            level={PermissionLevel.currentWeb}
            permissions={[SPPermission.manageWeb]}
        >
            <div className={styles.settings} onClick={openPanel}>
                <Icon iconName="Add"/>
            </div>
            <Panel
                isOpen={isPanelOpen}
                onDismiss={dismissPanel}
                isLightDismiss={true}
                closeButtonAriaLabel="Close"
            >
                <ListManager
                    listName="BannerImages"
                    listId="a6d0aca8-6768-4b21-9561-1e61c5a7ed7e"
                    business={bll}
                    strings={{
                        editDialogTitle: 'Editar Imagem de Banner',
                        createDialogTitle: 'Criar Imagem de Banner',
                        mainDialogTitle: 'Administrar Imagens de Banner',
                        buttonTitle: 'Administrar Imagens de Banner'
                    }}
                />
            </Panel>
        </SecurityTrimmedControl>
    );
}