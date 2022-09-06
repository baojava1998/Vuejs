<template>
    <div>
        <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
            <!--        header-->
            <Header/>
            <!--        sidebar-->
            <SideBar/>
            <!--        breadcrumb-->
            <div class="page-wrapper">
                <Breadcrumb/>
                <div class="container-fluid">
                    <slot/>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../components/layouts/Header";
import SideBar from "../components/layouts/Sidebar";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Footer from "../components/layouts/Footer";


export default {
    components: {
        Header, SideBar, Breadcrumb, Footer
    }
}
</script>
