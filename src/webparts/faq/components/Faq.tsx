import * as React from 'react';
import styles from './Faq.module.scss';
import { useEffect, useState } from 'react';
import { FaqBusiness } from '../../../business/FaqBusiness';
import IFaq from '../../../interfaces/lists/IFaq';
import { IFaqProps } from './IFaqProps';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";

export default function Faq(props: IFaqProps) {

    const bll = new FaqBusiness(props.context);

    const [faqs, setFaqs] = useState<IFaq[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const auxFaqs = await bll.getAll();
        setFaqs(auxFaqs);
    };

    return (
        <>
            <h1 className={styles.title}>Perguntas Frequentes</h1>
            {faqs.map((faq, i) => {
                return (
                    <Accordion title={faq.title} defaultCollapsed={true} key={i}>
                        <p>{faq.Answer}</p>
                    </Accordion>
                );
            })}
        </>
    );
}