import React from 'react';
import './PracticeAreas.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import AccData from "../../utils/Practise.json";
import HeroSection from '../HeroSection/HeroSection';
import { motion } from 'framer-motion';

const PracticeAreas = () => {
  const heroText = "Our Specialty.";
  const heroImage = "./hero2.webp"; // Replace with your image URL

  return (
    <section className="v-wrapper" id='cert'>
      <div className="innerWidth flexColStart paddings v-container">
        <HeroSection text={heroText} image={heroImage} />
        <div className="certification">
          <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ type: "easeIn", duration: 1 }} 
                  className="flexCenter accordion-container">

            <Accordion allowZeroExpanded>
              {AccData.map((item, index) => (
                <AccordionItem key={index} className="accordion__item">
                  <AccordionItemHeading>
                    <AccordionItemButton className="accordion__button secondarytext" hideExpanded>
                      {item.name}
                      <span className="accordion-icon" aria-hidden="true"></span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="accordion__panel secondaryText">
                    <p>{item.description}</p>
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