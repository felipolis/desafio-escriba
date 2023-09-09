<script>

</script>

<template>
    <div class="sidebar-container">
        <div class="img-container">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="nav-links">
            <router-link
                to="/pessoas"
                active-class="active"
                exact
            >
                <i class="fa-regular fa-user"></i>
                Pessoas
            </router-link>
            <router-link
                to="/produtos"
                active-class="active"
                exact
            >
                <i class="fa-solid fa-tag"></i>
                Produtos
            </router-link>
            <router-link
                to="/pedidos"
                active-class="active"
                exact
            >
                <i class="fa-brands fa-shopify"></i>
                Pedidos
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
    .sidebar-container {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        border-radius: 1rem;
        padding: 2rem 0.5rem 2rem 0.5rem;

        .img-container {
            width: 90%;

            img {
                width: 100%;
            }
        }

        .nav-links {
            width: 100%;
            list-style: none;
            padding: 0;
            margin-top: 2rem;

            a {
                text-decoration: none;
                color: rgb(63, 63, 63);
                padding: 1rem;
                border-radius: 1rem;
                cursor: pointer;
                transition: 0.3s;
                display: flex;
                align-items: center;
                gap: 1rem;

                &.active {
                    background-color: #f5f5f5;
                }


                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }
    }

</style>