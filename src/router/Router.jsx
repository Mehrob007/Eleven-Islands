import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

// import components
import Loading from '../components/loading/Loading'

// lazy pages
const Layout = lazy(() => import('../components/layout/Layout'))
const MainPage = lazy(() => import('../components/layout/page/MainPage'))
const Products = lazy(() => import('../components/layout/page/Products'))
const Product = lazy(() => import('../components/layout/page/Prodect'))

export default function Router() {
    const [isLoading, setIsLoading] = useState(true)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timeoutId)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const timeoutId = setTimeout(() => setIsDataLoaded(true), 1000)
            return () => clearTimeout(timeoutId)
        }
    }, [isLoading])

    return (
        <div className={!isDataLoaded && 'box'}>
            {!isDataLoaded && <Loading isLoading={isLoading} />}
            <Suspense fallback={<Loading isLoading={true} />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<MainPage />} />
                        <Route path="products" element={<Products />} />
                        <Route path="product/:id" element={<Product />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    )
}