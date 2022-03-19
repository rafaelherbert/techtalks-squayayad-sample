import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { Icon, Panel, PanelType } from 'office-ui-fabric-react';
import * as React from 'react';
import { useState } from 'react';
import { BannerImageBusiness } from '../../../../business/BannerImageBusiness';
import ListManager from '../../../../components/ListManager/ListManager';
import { IAdminApplicationCustomizerProperties } from '../../AdminApplicationCustomizer';
import styles from './Settings.module.scss';
import { SecurityTrimmedControl, PermissionLevel } from "@pnp/spfx-controls-react/lib/SecurityTrimmedControl";
import { SPPermission } from '@microsoft/sp-page-context';
import { FaqBusiness } from '../../../../business/FaqBusiness';

interface ISettingsProps {
    context: ApplicationCustomizerContext;
}

export default function Settings(props:ISettingsProps) {
    const bannerImageBll = new BannerImageBusiness(props.context);
    const faqBll = new FaqBusiness(props.context);

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const dismissPanel = () => setIsPanelOpen(false);
    const openPanel = () => setIsPanelOpen(true);

    return (
        <SecurityTrimmedControl 
            context={props.context}
            level={PermissionLevel.currentWeb}
            permissions={[SPPermission.managePermissions]}
            showLoadingAnimation={true}
            noPermissionsControl={<div className={styles.settings}>Usuário sem permissão.</div>}
            className={styles.settings}
        >
            <div className={styles.settingsButton} onClick={openPanel}>
                <Icon iconName="Settings"/>
            </div>
            <Panel
                isOpen={isPanelOpen}
                onDismiss={dismissPanel}
                isLightDismiss={true}
                closeButtonAriaLabel="Close"
            >
                <ListManager
                    business={bannerImageBll}
                    strings={{
                        editDialogTitle: 'Editar Imagem de Banner',
                        createDialogTitle: 'Criar Imagem de Banner',
                        mainDialogTitle: 'Administrar Imagens de Banner',
                        buttonTitle: 'Administrar Imagens de Banner'
                    }}
                />
                <ListManager
                    business={faqBll}
                    strings={{
                        editDialogTitle: 'Editar Perguntas Frequentes',
                        createDialogTitle: 'Criar Pergunta Frequente',
                        mainDialogTitle: 'Administrar Perguntas Frequentes',
                        buttonTitle: 'Administrar Perguntas Frequentes'
                    }}
                />
            </Panel>
        </SecurityTrimmedControl>
    );
}