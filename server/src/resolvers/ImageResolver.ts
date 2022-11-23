import { Args, Mutation, Query, Resolver } from 'type-graphql';

import Image from '../models/Image';
import CreateImageInput from './input/CreateImageInput';
//import DeleteImageInput from './input/DeleteImageInput';
//import GetImageInput from './input/GetImageInput';
import ImageUtils from '../models/utils/ImageUtils';

@Resolver(Image)
class ImageResolver {
  @Query(() => [Image])
	async images() {
		return await Image.find();
	}

	@Mutation(() => Image)
	async createImage(
		@Args()
		{ name, project, created_at	}: CreateImageInput
	) {
		return await ImageUtils.createImage({
			name,
            project,
			created_at,

		})
	}

//	@Mutation(() => Project)
//	async deleteProject(@Args() { id }: DeleteProjectInput) {
//		return ProjectUtils.deleteProject({ id });
//	}

//	@Query(() => Project)
//	async getProjectById(@Args() { id }: GetProjectInput) {
//		return ProjectUtils.getProjectById({ id });
//	}

}

export default ImageResolver;
