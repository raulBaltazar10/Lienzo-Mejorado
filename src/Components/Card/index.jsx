import products from '../../data/productos.json';
import { useContext } from 'react'
import { FaPlus } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { ShoppingCartContext } from '../../Context'

const Card = () => {
    const context = useContext(ShoppingCartContext)


    const showProduct = (product) => {
        context.openProductDetail()
        context.setProductToShow(product)
    }

    const addProductsToCar = (event, productData) => {
        event.stopPropagation()
       context.setCount(context.count + 1)
        context.setCartProducts([...context.cartProducts, productData])
        context.openCheckoutSideMenu()
        context.closeProductDetail()
        console.log('Cart: ', context.cartProducts)
    }

    const renderIcon = (product) => {
    
        const isInCart = context.cartProducts.some(cartProduct => cartProduct.id === product.id)

        if(isInCart) {
            return (
                <div className=' bg-white text-black border-2 border-black rounded-md  my-2 z-10 cursor-pointer relative text-center flex justify-center p-1'>
                    <MdDone className=' text-center flex justify-center'/>
                </div>
            )
        } else {
            return (
                <div className=' bg-black text-white rounded-md  my-2 z-10 cursor-pointer relative text-center flex justify-center p-1'
                onClick={(event) => addProductsToCar(event, product)}>
                    <FaPlus className=' text-center flex justify-center'/>
                </div>
            )
        }
    }
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 z-20">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <div key={product.id} className="group relative" onClick={() => showProduct(product)}>
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href={product.href}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                        {renderIcon(product)}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Card