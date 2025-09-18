'use client'
import {usePathname} from "next/navigation";
import {siteConfig} from "@/config/site.config";

const Title = () => {
    const pathname = usePathname();

    const currentNavTitle = siteConfig.navItems.find(item => item.href === pathname)?.label || 'Page';

    return (
        <div className="d-flex justify-center items-center text-center mt-5">
            <h1 className="text-4xl font-bold mb-4">{currentNavTitle}</h1>
        </div>
    )

}

export default Title;