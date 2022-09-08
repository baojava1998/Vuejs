import AllProduct from './components/product/ListProduct.vue';
import CreateProduct from './components/product/CreateProduct.vue';
import EditProduct from './components/product/EditProduct.vue';

export const routes = [
    {
        name: 'home',
        path: '/product',
        component: AllProduct
    },
    {
        name: 'create',
        path: '/product/create',
        component: CreateProduct
    },
    {
        name: 'edit',
        path: '/product/edit/:id',
        component: EditProduct
    },
    {
        name: 'login',
        path: '/login',
        meta: { layout: 'login'}
    }
];
