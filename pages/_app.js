import App, { Container } from 'next/app';
import { makeStore, saveState } from '../ducks/store';
import { Provider } from 'react-redux';
import React from 'react';
import throttle from 'lodash/throttle';
import withRedux from 'next-redux-wrapper';

class MyApp extends App
{
    static async getInitialProps({ Component, ctx })
    {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    componentDidMount()
    {
        const { store } = this.props;
        store.subscribe(throttle(() =>
        {
            saveState(store.getState());
        }, 1000));
    }

    render()
    {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={ store }>
                    <Component { ...pageProps } />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(makeStore)(MyApp);