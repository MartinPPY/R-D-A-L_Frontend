import type { ReactNode } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./NotFound"

interface Props {
    children: ReactNode
}

export const RoutesWithNotFound = ({ children }: Props) => {
    return (
        <BrowserRouter>
            <Routes>
                {children}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
