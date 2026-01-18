import PageLayout from "@/components/layout/page-layout";
import EntranceGate from "@/pages/entrance-gate";
import Landing from "@/pages/landing";
import Gallery from "@/pages/gallery";
import Discography from "@/pages/discography";
import Contact from "@/pages/contact";
import { Navigate, Route, Routes } from "react-router-dom";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EntranceGate />} />
            <Route element={<PageLayout />}>
                <Route path="/home" element={<Landing />} />
                <Route path="/galeria" element={<Gallery />} />
                <Route path="/discografia" element={<Discography />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}