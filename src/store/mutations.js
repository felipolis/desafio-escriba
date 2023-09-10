
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

export function editPerson(state, person) {
    const index = state.searchedPeople.findIndex(p => p.id === person.id)
    if (index !== -1) {
        state.searchedPeople.splice(index, 1, person)
    }
}

export function deletePerson(state, person) {
    state.searchedPeople = state.searchedPeople.filter(p => p.id !== person.id)
}

export function addProduct(state, product) {
    state.searchedProducts.push(product)
}

export function editProduct(state, product) {
    const index = state.searchedProducts.findIndex(p => p.id === product.id)
    if (index !== -1) {
        state.searchedProducts.splice(index, 1, product)
    }
}

export function deleteProduct(state, product) {
    state.searchedProducts = state.searchedProducts.filter(p => p.id !== product.id)
}

export function addOrder(state, order) {
    state.searchedOrders.push(order)
}

export function editOrder(state, order) {
    const index = state.searchedOrders.findIndex(o => o.id === order.id)
    if (index !== -1) {
        state.searchedOrders.splice(index, 1, order)
    }
}

export function deleteOrder(state, order) {
    state.searchedOrders = state.searchedOrders.filter(o => o.id !== order.id)
}