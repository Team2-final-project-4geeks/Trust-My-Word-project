"""empty message

Revision ID: 7bd1c253752b
Revises: 12272daed610
Create Date: 2023-07-31 16:55:15.578442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bd1c253752b'
down_revision = '12272daed610'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.drop_column('author_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_name', sa.VARCHAR(length=200), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
