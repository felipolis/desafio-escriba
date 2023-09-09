export default {
    getPeople: (state) => state.searchedPeople,
    getPeopleByKeyword: (state) => (keyword) => {
        return state.searchedPeople.filter(people => people.nome.toLowerCase().includes(keyword.toLowerCase()))
    }
}