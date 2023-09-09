
export function setSearchedPeople(state, people) {
    state.searchedPeople = people || []
}

export function setSearchedProducts(state, products) {
    state.searchedProducts = products || []
}

export function setSearchedOrders(state, orders) {
    state.searchedOrders = orders || []
}

export function setModalState(state, isOpen) {
    state.isModalOpen = isOpen
}