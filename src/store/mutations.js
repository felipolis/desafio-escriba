
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