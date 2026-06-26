export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    title,
    category,
    location,
    year,
    "heroImageUrl": coverImage.asset->url,
    "heroWidth": coverImage.asset->metadata.dimensions.width,
    "heroHeight": coverImage.asset->metadata.dimensions.height,
    "items": items[]{
      "mediaType": mediaType,
      "url": select(mediaType == "photo" => photo.asset->url, video.asset->url),
      "width": select(mediaType == "photo" => photo.asset->metadata.dimensions.width, 1920),
      "height": select(mediaType == "photo" => photo.asset->metadata.dimensions.height, 1080),
    }
  }
`

export const COLLECTION_QUERY = `
  *[_type == "collection"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    year,
    "heroImageUrl": coverImage.asset->url,
    "heroWidth": coverImage.asset->metadata.dimensions.width,
    "heroHeight": coverImage.asset->metadata.dimensions.height,
  }
`


export const SELECTED_WORKS_QUERY = `
  *[_type == "selectedWork" || _type == "drafts.selectedWork"] | order(order asc) {
    _id,
    type,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    "lqip": image.asset->metadata.lqip,
    "videoUrl": video.asset->url,
  }
`