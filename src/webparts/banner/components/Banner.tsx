import * as React from 'react';
import styles from './Banner.module.scss';
import { IBannerProps } from './IBannerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect } from 'react';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react';

export default function Banner(props: IBannerProps) {

    useEffect(() => {
    }, [props.filePickerResult]);

    return (
        <span>
            <h1>
                Olá mundo!
            </h1>
            <FilePicker
                bingAPIKey="<BING API KEY>"
                accepts= {[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
                buttonIcon="FileImage"
                onSave={(filePickerResult: IFilePickerResult) => { this.setState({filePickerResult }); }}
                onChange={(filePickerResult: IFilePickerResult) => { this.setState({filePickerResult }); }}
                context={props.context}
            />
        </span>
    );
}