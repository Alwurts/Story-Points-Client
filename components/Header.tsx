/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import classNames from "../utils/className";
import ProfileDropdown from "./buttons/ProfileDropdown";
import NotificationButton from "./buttons/NotificationButton";
import MenuButton from "./buttons/MenuButton";
import logoSquare from "../images/logo-square.svg";
import logoLarge from "../images/logo-large.png";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Link from "next/link";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Perfil", href: "/users" },
  { name: "Cotizaciones", href: "/quoting" },
];

const Header = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <Disclosure as="nav" className="border-b-2 bg-slate-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MenuButton open={open} />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src={logoSquare}
                    alt="Picture of the author"
                  />

                  <Image
                    className="hidden h-8 w-auto lg:block"
                    src={logoLarge}
                    alt="Picture of the author"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            isActive(item.href)
                              ? "bg-orange-500 text-white"
                              : "text-stone-900 hover:bg-stone-800 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          data-active={isActive(item.href)}
                          aria-current={
                            isActive(item.href) ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationButton />
                <ProfileDropdown />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      isActive(item.href)
                        ? "bg-orange-500 text-white"
                        : "text-stone-900 hover:bg-stone-800 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    data-active={isActive(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
