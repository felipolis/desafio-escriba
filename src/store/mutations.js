
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

export function addPerson(state, person) {
    state.searchedPeople.push(person)
}

export function deletePerson(state, person) {
    state.searchedPeople = state.searchedPeople.filter(p => p.id !== person.id)
}

export function addProduct(state, product) {
    state.searchedProducts.push(product)
}

export function deleteProduct(state, product) {
    state.searchedProducts = state.searchedProducts.filter(p => p.id !== product.id)
}

export function addOrder(state, order) {
    state.searchedOrders.push(order)
}

export function deleteOrder(state, order) {
    state.searchedOrders = state.searchedOrders.filter(o => o.id !== order.id)
}