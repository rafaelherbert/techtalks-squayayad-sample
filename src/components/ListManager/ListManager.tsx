import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DynamicForm } from '@pnp/spfx-controls-react';
import { Dialog, PrimaryButton, Icon, MessageBarType, MessageBar } from 'office-ui-fabric-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BaseCrudBusiness, ICrudListItem } from '../../business/base/BaseCrudBusiness';
import styles from './ListManager.module.scss';

interface IListManagerProps {
    business: BaseCrudBusiness<ICrudListItem>;
    strings: {
        editDialogTitle: string;
        createDialogTitle: string;
        mainDialogTitle: string;
        buttonTitle: string;
    };
}

export default function ListManager(props: IListManagerProps) {
    const [listItems, setListItems]                       = useState<ICrudListItem[]>([]);
    const [selectedListItem, setSelectedListItem]         = useState<ICrudListItem>(null);
    const [hideMainDialog, setHideMainDialog]             = useState<boolean>(true);
    const [hideEditDialog, setHideEditDialog]             = useState<boolean>(true);
    const [error, setError]                               = useState<string>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const auxListItems = await props.business.getAll();
            setListItems(auxListItems);
            setSelectedListItem(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const closeEditDialog = () => {
        setHideEditDialog(true);
    };

    const refresh = () => {
        closeEditDialog();
        loadData();
    };

    const openEditDialog = (item: ICrudListItem) => {
        setHideEditDialog(false);
        setSelectedListItem(item);
    };

    const deleteItem = async (item: ICrudListItem) => {
        try {
            await props.business.deleteById(item.id);
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
                        <div className={styles.createButton} onClick={() => setHideEditDialog(false)}>
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
                {listItems.map(listItem => (
                    <div className={styles.listItem}>
                        <div className={styles.title}>{listItem.title}</div>
                        <div className={styles.actions}>
                            <Icon iconName="Edit" onClick={() => openEditDialog(listItem)}/>
                            <Icon iconName="Delete" onClick={() => deleteItem(listItem)}/>
                        </div>
                    </div>
                ))}
            </Dialog>

            <Dialog
                hidden={hideEditDialog}
                onDismiss={closeEditDialog}
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
                        onCancelled={closeEditDialog}
                        onBeforeSubmit={async (listItem) => { return false; }}
                        onSubmitError={(listItem, submitError) => { alert(submitError.message); }}
                        onSubmitted={refresh}
                    />
                </div>
            </Dialog>
        </div>
    );
} 