'use client';

import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import type { Settings } from 'react-slick';
import ReactSlick from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface SliderProps extends PropsWithChildren {
    settings?: Settings;
}

const Slider: FC<SliderProps> = ({ children, settings }) => {
    const sliderSettings: Settings = {
        // default settings
        infinite: true,
        arrows: true,
        // override settings
        ...settings,
    };

    return <ReactSlick {...sliderSettings}>{children}</ReactSlick>;
};

export default Slider;
