import Block from '@/components/Block'
import EndpointBlock from '@/components/EndpointBlock'
import PageHeader from '@/components/PageHeader'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'
import { endpoints } from '@/data/endpoints'
import { structuredData } from '@/data/schema'

export default function Endpoints() {
  return (
    <>
      <Seo path="/endpoints" />
      <StructuredData data={structuredData('/endpoints')} />

      <PageHeader eyebrow="Reference" title="Mountain API endpoints" />

      {endpoints.map((endpoint) => (
        <EndpointBlock key={endpoint.path} endpoint={endpoint} />
      ))}
    </>
  )
}
