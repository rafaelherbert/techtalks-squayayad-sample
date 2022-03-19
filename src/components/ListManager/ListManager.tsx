import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DynamicForm } from '@pnp/spfx-controls-react';
import { Dialog, PrimaryButton, Icon, MessageBarType, MessageBar } from 'office-ui-fabric-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BaseCrudBusiness, ICrudListItem } from '../../business/base/BaseCrudBusiness';
import styles from './ListManager.module.scss';

interface IBannerImageAdminProps {
    business: BaseCrudBusiness<ICrudListItem>;
    strings: {
        editDialogTitle: string;
        createDialogTitle: string;
        mainDialogTitle: string;
        buttonTitle: string;
    };
}

export default function ListManager(props: IBannerImageAdminProps) {
    const [listItems, setListItems]                       = useState<ICrudListItem[]>([]);
    const [selectedListItem, setSelectedListItem]         = useState<ICrudListItem>(null);
    const [hideMainDialog, setHideMainDialog]             = useState<boolean>(true);
    const [hideBannerEditDialog, setHideBannerEditDialog] = useState<boolean>(true);
    const [error, setError]                               = useState<string>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const auxBannerImages = await props.business.getAll();
            setListItems(auxBannerImages);
            setSelectedListItem(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const closeBannerEditDialog = () => {
        setHideBannerEditDialog(true);
    };

    const refresh = () => {
        closeBannerEditDialog();
        loadData();
    };

    const openBannerEditDialog = (bannerImage: ICrudListItem) => {
        setHideBannerEditDialog(false);
        setSelectedListItem(bannerImage);
    };

    const deleteBanner = async (bannerImage: ICrudListItem) => {
        try {
            await props.business.deleteById(bannerImage.id);
        } catch (error) {
            setError(error.message);
        }

        loadData();
    };

    const errorComponent = error ? <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar> : <></>;

    return (
        <div className="TechTalksGlobalStyles">
            {errorComponent}
            <PrimaryButton className={styles.mainButton} onClick={() => setHideMainDialog(false)} text={props.strings.buttonTitle}/>
            <Dialog
                hidden={hideMainDialog}
                onDismiss={() => setHideMainDialog(true)}
                dialogContentProps={{
                    className: "TechTalksGlobalStyles",
                    title: <>
                        {props.strings.createDialogTitle}
                        <div className={styles.createButton} onClick={() => setHideBannerEditDialog(false)}>
                            <Icon iconName='Add'/>
                            <span>
                                Novo Item
                            </span>
                        </div>
                    </>,
                    showCloseButton: false
                }}
                styles={{root: {borderRadius: 4}}}
                maxWidth={600}
                minWidth={600}
            >
                {listItems.map(bannerImage => (
                    <div className={styles.bannerItem}>
                        <div className={styles.title}>{bannerImage.title}</div>
                        <div className={styles.actions}>
                            <Icon iconName="Edit" onClick={() => openBannerEditDialog(bannerImage)}/>
                            <Icon iconName="Delete" onClick={() => deleteBanner(bannerImage)}/>
                        </div>
                    </div>
                ))}
            </Dialog>

            <Dialog
                hidden={hideBannerEditDialog}
                onDismiss={closeBannerEditDialog}
                styles={{root: {borderRadius: 4}}}
                dialogContentProps={{
                    title: selectedListItem ? props.strings.editDialogTitle : props.strings.createDialogTitle
                }}
                maxWidth={900}
                minWidth={900}
            >
                <div className="TechTalksGlobalStyles">
                    <DynamicForm
                        key={selectedListItem ? selectedListItem.id : null}
                        context={props.business.context}
                        listId={props.business.listId}  
                        listItemId={selectedListItem ? selectedListItem.id : null}
                        onCancelled={closeBannerEditDialog}
                        onBeforeSubmit={async (listItem) => { return false; }}
                        onSubmitError={(listItem, submitError) => { alert(submitError.message); }}
                        onSubmitted={refresh}
                    />
                </div>
            </Dialog>
        </div>
    );
} 