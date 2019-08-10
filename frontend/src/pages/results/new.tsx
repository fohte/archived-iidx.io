import Head from 'next/head'
import Router from 'next/router'
import * as React from 'react'

import Container from '@app/components/atoms/Container'
import RegisterResultForm from '@app/components/organisms/RegisterResultForm'
import MainLayout from '@app/components/templates/MainLayout'
import { useRegisterResultsWithCsvMutation } from '@app/queries'

const ResultsNew = () => {
  const [registerResultsWithCSV] = useRegisterResultsWithCsvMutation()

  return (
    <>
      <Head>
        <title>Register results from CSV | iidx.io</title>
      </Head>

      <MainLayout>
        <Container>
          <RegisterResultForm
            onSubmit={async ({ csv, playStyle }) => {
              await registerResultsWithCSV({
                variables: { csv, playStyle },
              })
              Router.push('/')
            }}
          />
        </Container>
      </MainLayout>
    </>
  )
}

export default ResultsNew
