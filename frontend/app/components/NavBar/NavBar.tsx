import Image from 'next/image'
import Link from 'next/link'
import {navbarQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import {sanityFetch} from '@/sanity/lib/live'
import {NavbarQueryResult} from '@/sanity.types'
import ShoppingCartIcon from './ShoppingCartIcon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'

interface DropdownItem {
  label: string
  url: string
}

type NavItem = NonNullable<NonNullable<NavbarQueryResult>['items']>[number]

export default async function NavBar() {
  const {data} = await sanityFetch({query: navbarQuery})
  const navbarArray = data as NavbarQueryResult

  // Get the first navbar document from the array
  const navbarData = navbarArray

  const logo = urlForImage(navbarData?.logo)?.url()
  const shoppingCartIcon = navbarData?.shoppingBagIcon
  const items = navbarData?.items

  // Helper to get dropdown items
  const getDropdownItems = (item: NavItem): DropdownItem[] => {
    if (!item) return []

    switch (item.type) {
      case 'dropdown':
        return (
          item.dropdownItems?.map((dropdownItem) => ({
            label: dropdownItem.label || '',
            url: dropdownItem.url || '#',
          })) || []
        )

      case 'artists':
        if (item.showAllArtists) {
          return (
            navbarData?.allArtists?.map((artist) => ({
              label: artist.authorName || '',
              url: `/artists/${artist.slug?.current || ''}`,
            })) || []
          )
        }
        return (
          item.selectedArtists?.map((artist) => ({
            label: artist.authorName || '',
            url: `/artists/${artist.slug?.current || ''}`,
          })) || []
        )

      case 'categories':
        if (item.showAllCategories) {
          return (
            navbarData?.allCategories?.map((category) => ({
              label: category.title || '',
              url: `/categories/${category.slug?.current || ''}`,
            })) || []
          )
        }
        return (
          item.selectedCategories?.map((category) => ({
            label: category.title || '',
            url: `/categories/${category.slug?.current || ''}`,
          })) || []
        )

      default:
        return []
    }
  }

  return (
    <NavigationMenu className="w-full max-w-none">
      <NavigationMenuList className="w-full justify-between">
        {/* Logo */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" aria-label="Home">
              {logo ? (
                <Image src={logo} alt="Site logo" width={120} height={40} priority />
              ) : (
                <span className="text-xl font-bold">District 12</span>
              )}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {items?.map((item) => {
            if (!item) return null

            return (
              // links
              <NavigationMenuItem key={item.label}>
                {item.type === 'link' ? (
                  <NavigationMenuLink asChild>
                    <Link href={item.url || '#'} className={navigationMenuTriggerStyle()}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                ) : (
                  <>
                    {/* dropdowns */}
                    <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul>
                        {getDropdownItems(item).map((dropdownItem) => (
                          <li key={dropdownItem.label}>
                            <NavigationMenuLink asChild>
                              <Link href={dropdownItem.url}>
                                <div>{dropdownItem.label}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            )
          })}

          {/* Shopping Cart */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/checkout" aria-label="Shopping cart icon">
                <ShoppingCartIcon icon={shoppingCartIcon} />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
