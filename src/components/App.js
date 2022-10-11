import React, { useState } from 'react';
import Header from './Header';
import Tasks from './Tasks';
import Timeline from './TimelineContainer';
import { ThemeProvider } from './ThemeContext';


export default function App() {

    return (
        <>
            <ThemeProvider>
                <Header />
                <Timeline />
                <Tasks />
            </ThemeProvider>
        </>
    )
}

