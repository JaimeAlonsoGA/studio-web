import ActivitiesSection from "@/components/landing/activities";
import SpecialitiesSection from "@/components/landing/specialities";
import ContactSection from "@/components/landing/contact";
import DiscographySection from "@/components/landing/discography";
import GearSection from "@/components/landing/gear";
import HeroSection from "@/components/landing/hero";
import IntroSection from "@/components/landing/introduction";
import LocationSection from "@/components/landing/location";
import ServicesSection from "@/components/landing/services";
import TeamSection from "@/components/landing/team";
import OnlineSection from "@/components/landing/online";

export default function Landing() {
    return (
        <div className="w-full">
            <HeroSection />
            <IntroSection />
            <ServicesSection />
            <TeamSection />
            <DiscographySection />
            <SpecialitiesSection />
            <GearSection />
            <LocationSection />
            <ActivitiesSection />
            <OnlineSection />
            <ContactSection />
        </div>
    );
}