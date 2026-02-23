import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class WaitlistStatusDto {
  @Field(() => String, { description: 'The email address' })
  email!: string;

  @Field(() => Boolean, { description: 'Whether the email is on the waitlist' })
  onWaitlist!: boolean;

  @Field(() => String, {
    description: 'Human-readable status message',
    nullable: true,
  })
  message?: string;
}
