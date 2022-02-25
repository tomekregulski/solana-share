use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("shdZ5TeWXcyS99xZ88CPcQ8PCDR3eknk56S3acrB4gm");

#[program]
pub mod staking {
    use super::*;
    pub fn transfer_token(ctx: Context<TransferToken>) -> Result<()> {
            msg!("starting tokens: {}");
            token::transfer(ctx.accounts.transfer_ctx(), 1)?;
            msg!("token transfer succeeded");
            Ok(())
        }
    }

#[derive(Accounts)]
pub struct TransferToken<'info> {
    pub sender: Signer<'info>,
    // pub owner: Signer<'info>, // comment in and redeploy to work with test scripts
    #[account(mut)]
    pub sender_token: Account<'info, TokenAccount>,
    #[account(mut)]
    pub receiver_token: Account<'info, TokenAccount>,
    pub mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
}

impl<'info> TransferToken<'info> {
    fn transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        CpiContext::new(
            self.token_program.to_account_info(),
            Transfer {
                from: self.sender_token.to_account_info(),
                to: self.receiver_token.to_account_info(),
                authority: self.sender.to_account_info(), // change to owner if running test scripts
            },
        )
    }
}
