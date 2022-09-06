<template>
    <aside class="left-sidebar" data-sidebarbg="skin5">
        <!-- Sidebar scroll-->
        <div class="scroll-sidebar">
            <!-- Sidebar navigation-->
            <nav class="sidebar-nav">
                <ul id="sidebarnav" class="pt-4">
                    <li class="sidebar-item">
                        <router-link :to='{name:"home"}' class="waves-effect waves-dark sidebar-link">
                            <i class="mdi mdi-view-dashboard"></i>
                            <span class="hide-menu">Product List</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>
