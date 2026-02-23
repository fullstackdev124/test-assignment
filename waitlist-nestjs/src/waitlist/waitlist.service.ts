import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { AddToWaitlistInput } from './dto';
import { WaitlistStatusDto } from './dto/waitlist-status.dto';

@Injectable()
export class WaitlistService {
  private readonly waitlist: Set<string> = new Set();

  addToWaitlist(input: AddToWaitlistInput): WaitlistStatusDto {
    const email = input.email.trim().toLowerCase();

    if (this.waitlist.has(email)) {
      throw new GraphQLError('This email is already registered on the waitlist.', {
        extensions: {
          code: 'ALREADY_REGISTERED',
          email,
        },
      });
    }

    this.waitlist.add(email);
    return {
      email,
      onWaitlist: true,
      message: 'Successfully added to the waitlist.',
    };
  }

  getWaitlistStatus(email: string): WaitlistStatusDto {
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new GraphQLError('Email is required.', {
        extensions: { code: 'VALIDATION_ERROR' },
      });
    }

    const onWaitlist = this.waitlist.has(normalizedEmail);
    return {
      email: normalizedEmail,
      onWaitlist,
      message: onWaitlist
        ? 'You are on the waitlist.'
        : 'This email is not on the waitlist.',
    };
  }
}
