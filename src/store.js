const RESTAURANT_USERS = [{
        email: 'jackbarr123@googlemail.com',
        restaurantId: '16675470'
    },
    {
        email: 'jackbarr94@hotmail.com',
        restaurantId: '16674842'
    }
];

const store = {
    state: {
        chosenRestaurant: {},
        currentUser: {},
        restaurant: false
    },
    setChosenRestaurant(restaurant) {
        this.state.chosenRestaurant = restaurant;
    },
    updateCurrentUser(user) {
        const restaurantUser = RESTAURANT_USERS.find(restaurantUser => restaurantUser.email === user.email);
        if (restaurantUser) {
            this.state.restaurant = true;
            this.state.currentUser = {...user, ...restaurantUser };
            return;
        }

        this.state.currentUser = user;
    }
};

export default store;