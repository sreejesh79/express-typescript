/* eslint-disable */ 
import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { Get } from '../../decorators/route.decorator';

@Controller( '/' )
@Service()
export class MainController {

	@Get( '' )
	public index = async ( req: Request, res: Response, next: NextFunction ) =>{
		console.log('index');
		try {
			res.status( 200 ).send( 'Welcome to Express Boilerplate' );
		} catch ( err ) {
			next( err );
		}
	};

}