import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DynamicForm } from '@pnp/spfx-controls-react';
import { Dialog, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BannerImageBusiness } from '../../business/BannerImageBusiness';
import IBannerImage from '../../interfaces/lists/IBannerImage';

interface IBannerImageAdminProps {
    context: ApplicationCustomizerContext;
}

export default function BannerImageAdmin(props: IBannerImageAdminProps) {
    const bll = new BannerImageBusiness(props.context);

    const [bannerImages, setBannerImages] = useState<IBannerImage[]>([]);
    const [selectedBannerImage, setSelectedBannerImage] = useState<IBannerImage>(null);
    const [hideMainDialog, setHideMainDialog] = useState<boolean>(true);
    const [hideBannerEditDialog, setHideBannerEditDialog] = useState<boolean>(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const auxBannerImages = await bll.getAll();
        setBannerImages(auxBannerImages);
    };

    const closeBannerEditDialog = () => {
        setSelectedBannerImage(null);
        setHideBannerEditDialog(true);
    };

    const openBannerEditDialog = (bannerImage: IBannerImage) => {
        setHideBannerEditDialog(false);
        setSelectedBannerImage(bannerImage);
    };

    const refresh = () => {
        closeBannerEditDialog();
        loadData();
    };

    return (
        <div>
            <div onClick={() => setHideMainDialog(false)}>Administração de imagens de banner</div>
            <Dialog
                hidden={hideMainDialog}
                onDismiss={() => setHideMainDialog(true)}
                dialogContentProps={{
                    title: "Administração de imagens de Banner"
                }}
                styles={{root: {borderRadius: 4}}}
                maxWidth={900}
                minWidth={900}
            >
                <PrimaryButton onClick={() => setHideBannerEditDialog(false)} text="Criar Imagem de Banner" />
                {bannerImages.map(bannerImage => (
                    <div onClick={() => openBannerEditDialog(bannerImage)}>
                        {bannerImage.title}
                    </div>
                ))}
            </Dialog>

            <Dialog
                hidden={hideBannerEditDialog}
                onDismiss={closeBannerEditDialog}
                styles={{root: {borderRadius: 4}}}
                dialogContentProps={{
                    title: selectedBannerImage ? "Editar Imagem de Banner" : "Criar Imagem de Banner"
                }}
                maxWidth={900}
                minWidth={900}
            >
                <DynamicForm
                    key={selectedBannerImage ? selectedBannerImage.id : null}
                    context={props.context} 
                    listId={"a6d0aca8-6768-4b21-9561-1e61c5a7ed7e"}  
                    listItemId={selectedBannerImage ? selectedBannerImage.id : null}
                    onCancelled={closeBannerEditDialog}
                    onBeforeSubmit={async (listItem) => { return false; }}
                    onSubmitError={(listItem, error) => { alert(error.message); }}
                    onSubmitted={refresh}
                />
            </Dialog>
        </div>
    );
} 