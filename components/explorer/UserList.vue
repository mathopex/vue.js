<template>
    <div class="user-card-list">
        <UserItem v-for=" user in UsersFilter()" :key="user.id" :user="user"/>
    </div>
</template>

<script>
import UserItem from './UserItem';
import { mapGetters } from 'vuex';
import { ApiUser } from 'src/common/api.service';
import { loadingHandler } from 'src/common/ui.service';
import { FILTER_HOUSE_TYPE,FILTER_CATERORY_TYPE} from 'components/publication/PublicationFilterComponent';
import { isEmpty ,isNil} from 'lodash';


export default {
    name: 'UserList',
    components: { UserItem },
    props: {
        filters: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            users:[]
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),

    },
    methods: {
        async fetchUser() {
            return ApiUser.getUsers();
        },

        UsersFilter() {
            let users = this.users

            if(!isNil(this.$route.params.filterSlug)) {
                users = users.filter((item) => {
                    if(!isNil(item.userInformations.house)) {
                        return item.userInformations.house.name.toLowerCase() === this.$route.params.filterSlug
                    }
                    }, this);
            }
            
                
            if (!isEmpty(this.filters)) {
               users = users.filter((item) => {
                    return this.filters.some((filter) => {
                        if (filter.filterType === FILTER_HOUSE_TYPE) {
                            if (!isNil(item.userInformations.house)) { //__ si maison vide alors c'est un compte pro
                                return filter.filterValue === item.userInformations.house.id;
                            }
                            return false;
                        }

                        if (filter.filterType === FILTER_CATERORY_TYPE) {
                            if (Array.isArray(filter.filterValue)) {
                                return filter.filterValue.includes(item.role.id);
                            }

                            return item.role.id === filter.filterValue;
                        }

                    });       
                }, this);
            }
            return users
        }
 
    },
    async mounted() {
        this.users = await loadingHandler(this.fetchUser)
        this.users = this.users['hydra:member']
    }
}

</script>

<style scoped>
.user-card-list {
    display: flex;
}


</style>