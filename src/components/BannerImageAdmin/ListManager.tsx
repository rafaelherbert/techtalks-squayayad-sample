import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DynamicForm } from '@pnp/spfx-controls-react';
import { Dialog, DialogFooter, PrimaryButton, DefaultButton, Icon, MessageBarType, MessageBar } from 'office-ui-fabric-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BannerImageBusiness } from '../../business/BannerImageBusiness';
import { BaseCrudBusiness, ICrudListItem } from '../../business/base/BaseCrudBusiness';
import IBannerImage from '../../interfaces/lists/IBannerImage';
import styles from './ListManager.module.scss';

interface IBannerImageAdminProps {
    listName: string;
    listId: string;
    business: BaseCrudBusiness<ICrudListItem>;
    strings: {
        editDialogTitle: string;
        createDialogTitle: string;
        mainDialogTitle: string;
        buttonTitle: string;
    };
}

export default function ListManager(props: IBannerImageAdminProps) {
    const [bannerImages, setBannerImages] = useState<ICrudListItem[]>([]);
    const [selectedBannerImage, setSelectedBannerImage] = useState<ICrudListItem>(null);
    const [hideMainDialog, setHideMainDialog] = useState<boolean>(true);
    const [hideBannerEditDialog, setHideBannerEditDialog] = useState<boolean>(true);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const auxBannerImages = await props.business.getAll();
        setBannerImages(auxBannerImages);
    };

    const closeBannerEditDialog = () => {
        setSelectedBannerImage(null);
        setHideBannerEditDialog(true);
    };

    const refresh = () => {
        closeBannerEditDialog();
        loadData();
    };

    const openBannerEditDialog = (bannerImage: ICrudListItem) => {
        setHideBannerEditDialog(false);
        setSelectedBannerImage(bannerImage);
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
            <PrimaryButton onClick={() => setHideMainDialog(false)} text={props.strings.buttonTitle}/>
            <Dialog
                hidden={hideMainDialog}
                onDismiss={() => setHideMainDialog(true)}
                dialogContentProps={{
                    title: props.strings.mainDialogTitle,
                }}
                styles={{root: {borderRadius: 4}}}
                maxWidth={600}
                minWidth={600}
            >
                <div className="TechTalksGlobalStyles">
                    <PrimaryButton className={styles.createButton} onClick={() => setHideBannerEditDialog(false)} text="Criar Imagem de Banner" />
                    {bannerImages.map(bannerImage => (
                        <div className={styles.bannerItem}>
                            <div className={styles.title}>{bannerImage.title}</div>
                            <div className={styles.actions}>
                                <Icon iconName="Edit" onClick={() => openBannerEditDialog(bannerImage)}/>
                                <Icon iconName="Delete" onClick={() => deleteBanner(bannerImage)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </Dialog>

            <Dialog
                hidden={hideBannerEditDialog}
                onDismiss={closeBannerEditDialog}
                styles={{root: {borderRadius: 4}}}
                dialogContentProps={{
                    title: selectedBannerImage ? props.strings.editDialogTitle : props.strings.createDialogTitle
                }}
                maxWidth={900}
                minWidth={900}
            >
                <div className="TechTalksGlobalStyles">
                    <DynamicForm
                        key={selectedBannerImage ? selectedBannerImage.id : null}
                        context={props.business.context}
                        listId={props.listId}  
                        listItemId={selectedBannerImage ? selectedBannerImage.id : null}
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