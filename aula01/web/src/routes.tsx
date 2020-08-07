import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './screens/Landing'
import TeacherList from './screens/TeacherList'
import TeacherForm from './screens/TeacherForm'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact />
            <Route path="/study" component={TeacherList} />
            <Route path="/teach" component={TeacherForm} />
        </BrowserRouter>
    )
}

export default Routes