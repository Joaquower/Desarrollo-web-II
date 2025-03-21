import '../style/products.css'
import ProductItem from '../components/ProductItem'

export default function Products() {
    return (
        <div>            
            <h1 >We release interesting articles</h1>
            <h1 className="osi" >about technology</h1>
            <h1 className="osa">///////////////////////////</h1>
            <div className='container-products'>
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    )
}