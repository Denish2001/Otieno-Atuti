import React from 'react';
import './PracticeAreas.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { motion, useReducedMotion } from 'framer-motion';
import AccData from '../../utils/Practise.json';
import HeroSection from '../HeroSection/HeroSection';

const HERO_TEXT = 'Our Specialty.';
const HERO_IMAGE = './hero2.webp';

const PracticeAreas = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="practice-wrapper" id="cert">
      <div className="innerWidth flexColStart paddings practice-container">
        <HeroSection text={HERO_TEXT} image={HERO_IMAGE} loading="eager" />

        <div className="practice-content">
          <motion.div
            className="practice-accordion-container"
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Accordion className="accordion" allowZeroExpanded>
              {AccData.map((item) => (
                <AccordionItem
                  key={item.id ?? item.name}
                  className="accordion__item"
                >
                  <AccordionItemHeading aria-level={2}>
                    <AccordionItemButton className="accordion__button">
                      <span className="accordion__title">{item.name}</span>
                      <span className="accordion__icon" aria-hidden="true" />
                    </AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel className="accordion__panel">
                    <div className="accordion__panel-inner">
                      <p className="secondaryText accordion__text">
                        {item.description}
                      </p>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
