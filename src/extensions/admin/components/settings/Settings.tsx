import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { Icon, Panel, PanelType } from 'office-ui-fabric-react';
import * as React from 'react';
import { useState } from 'react';
import BannerImageAdmin from '../../../../components/BannerImageAdmin/BannerImageAdmin';
import { IAdminApplicationCustomizerProperties } from '../../AdminApplicationCustomizer';
import styles from './Settings.module.scss';

interface ISettingsProps {
    context: ApplicationCustomizerContext;
}

export default function Settings(props:ISettingsProps) {

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const dismissPanel = () => {
        setIsPanelOpen(false);
    };

    const openPanel = () => {
        setIsPanelOpen(true);
    };

    return (
        <>
            <div className={styles.settings} onClick={openPanel}>
                <Icon iconName="Add"/>
            </div>
            <Panel
                isOpen={isPanelOpen}
                type={PanelType.medium}
                onDismiss={dismissPanel}
                isLightDismiss={true}
                closeButtonAriaLabel="Close"
            >
                <BannerImageAdmin context={props.context}/>
            </Panel>
        </>
    );
}