import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { WaitlistStatusDto } from './dto/waitlist-status.dto';
import { WaitlistService } from './waitlist.service';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email: string): void {
  const trimmed = email?.trim();
  if (!trimmed) {
    throw new GraphQLError('Email is required.', {
      extensions: { code: 'VALIDATION_ERROR' },
    });
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    throw new GraphQLError('Please provide a valid email address.', {
      extensions: { code: 'VALIDATION_ERROR', field: 'email' },
    });
  }
}

@Resolver(() => WaitlistStatusDto)
export class WaitlistResolver {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Mutation(() => WaitlistStatusDto, {
    name: 'addToWaitlist',
    description: 'Add an email to the waitlist',
  })
  addToWaitlist(@Args('email') email: string): WaitlistStatusDto {
    validateEmail(email);
    return this.waitlistService.addToWaitlist({ email: email.trim() });
  }

  @Query(() => WaitlistStatusDto, {
    name: 'getWaitlistStatus',
    description: 'Check if an email is on the waitlist',
  })
  getWaitlistStatus(@Args('email') email: string): WaitlistStatusDto {
    validateEmail(email);
    return this.waitlistService.getWaitlistStatus(email);
  }
}
