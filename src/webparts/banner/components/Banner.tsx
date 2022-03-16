import * as React from 'react';
import styles from './Banner.module.scss';
import { IBannerProps } from './IBannerProps';
import { useEffect, useState } from 'react';
import { ImageFit } from 'office-ui-fabric-react';
import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";
import { BannerImageBusiness } from '../../../business/BannerImageBusiness';
import IBannerImage from '../../../interfaces/lists/IBannerImage';

export default function Banner(props: IBannerProps) {

    const bll = new BannerImageBusiness(props.context);

    const [bannerImages, setBannerImages] = useState<IBannerImage[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const auxBannerImages = await bll.getAll();
        setBannerImages(auxBannerImages);
    };

    const carouselElements = bannerImages.map(bannerImage => ({
        imageSrc: bannerImage.Image.serverRelativeUrl,
        title: bannerImage.title,
        description: bannerImage.Description,
        url: bannerImage.Image.serverRelativeUrl,
        showDetailsOnHover: true,
        imageFit: ImageFit.cover
    }));

    return (
        <Carousel
            buttonsLocation={CarouselButtonsLocation.center}
            buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
            indicatorShape={CarouselIndicatorShape.circle}
            contentContainerStyles={styles.carouselImageContent}
            isInfinite={true}
            pauseOnHover={true}
            element={carouselElements}
        />
    );
}