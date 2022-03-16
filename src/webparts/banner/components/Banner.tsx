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

    return (
        <Carousel
            buttonsLocation={CarouselButtonsLocation.center}
            buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
            indicatorShape={CarouselIndicatorShape.circle}
            contentContainerStyles={styles.carouselImageContent}
            isInfinite={true}
            pauseOnHover={true}
            element={[
                ...bannerImages.map(bannerImage => ({
                    imageSrc: bannerImage.Image.serverRelativeUrl,
                    title: bannerImage.title,
                    description: bannerImage.Description,
                    url: bannerImage.Image.serverRelativeUrl,
                    showDetailsOnHover: true,
                    imageFit: ImageFit.cover
                })),
                {
                    imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                    title: 'Colosseum',
                    description: 'This is Colosseum',
                    url: 'https://en.wikipedia.org/wiki/Colosseum',
                    showDetailsOnHover: true,
                    imageFit: ImageFit.cover,
                },
                {
                    imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                    title: 'Colosseum',
                    description: 'This is Colosseum',
                    url: 'https://en.wikipedia.org/wiki/Colosseum',
                    showDetailsOnHover: true,
                    imageFit: ImageFit.cover
                },
                {
                    imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                    title: 'Colosseum',
                    description: 'This is Colosseum',
                    url: 'https://en.wikipedia.org/wiki/Colosseum',
                    showDetailsOnHover: true,
                    imageFit: ImageFit.cover
                }
            ]}
            onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
            onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
        />
    );
}