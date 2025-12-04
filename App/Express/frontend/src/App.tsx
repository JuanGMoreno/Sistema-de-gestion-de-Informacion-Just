import { useState } from 'react'
import Navbar from './shared/components/Navbar/Navbar'
import ProjectList from './shared/components/project/ProjectList'
import ListDataChart from './shared/components/Chart/ListDataChart'
import ShowAnalysis from './shared/components/IA-analysis/showAnalysis'


function App() {
  const [sectionActive, setSectionActive] = useState<'projects' | 'analysis' | 'charts'>('projects')

  return (
    <>
      <Navbar onSectionChange={setSectionActive} />
      {sectionActive === 'projects' && <ProjectList />}
      {sectionActive === 'charts' && <ListDataChart />}
      {sectionActive === 'analysis' && <ShowAnalysis />}
    </>
  )
}

export default App
